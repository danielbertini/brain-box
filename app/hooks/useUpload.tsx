"use client";
import ImageKit from "imagekit-javascript";
import { nanoid } from "nanoid";
import { useLocale } from "next-intl";
import { useState, useEffect } from "react";

export const useUpload = () => {
  const locale = useLocale();
  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const [uploadStatus, setUploadStatus] = useState<{
    status: string;
    progress?: number;
    message?: string;
    data?: any;
  }>();

  const upload = async (folder: string, fileName: string | null) => {
    const response = await fetch("/api/integrations/imagekit/upload", {
      headers: { "Accept-Language": locale },
    });
    const responseData = await response.json();

    if (file && responseData) {
      const customXHR = new XMLHttpRequest();
      const imagekit = new ImageKit({
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
        urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT as string,
      });

      customXHR.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          setUploadStatus({
            status: "progress",
            message: `Enviando - ${percent}%`,
            progress: percent,
          });
        }
      });

      customXHR.upload.addEventListener("error", (e) => {
        setUploadStatus({ status: "progress", message: "Ocorreu um erro" });
      });

      customXHR.upload.addEventListener("abort", (e) => {
        setUploadStatus({ status: "progress", message: "Cancelado" });
      });

      customXHR.upload.addEventListener("loadend", (e) => {
        setUploadStatus({
          status: "progress",
          progress: 100,
          message: "Processando",
        });
      });

      try {
        const result = await imagekit.upload({
          xhr: customXHR,
          file: preview as string,
          fileName: fileName || nanoid(),
          folder: folder,
          signature: responseData.signature,
          token: responseData.token,
          expire: responseData.expire,
        });
        setUploadStatus({ status: "done", data: result });
        return result;
      } catch (error) {
        setUploadStatus({ status: "error" });
      }
    }
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  useEffect(() => {
    if (uploadStatus?.status === "done") {
      setFile(undefined);
      setPreview(null);
      setUploadStatus(undefined);
    }
  }, [uploadStatus]);

  return {
    upload: (folder: string, fileName: string) => upload(folder, fileName),
    uploadPreview: preview,
    uploadStatus: uploadStatus,
    uploadFile: (value: File) => {
      setFile(value);
      setPreview(null);
    },
  };
};

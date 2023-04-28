import React, { useEffect, useState } from "react";
import Documents from "/Directus/SDKDirectus/services/Documents";
import { toast } from "react-toastify";
import Link from "next/link";
import Loading from "../../components/utilities/Loading";

import {
  FileDoc,
  FileMp3,
  FileMp4,
  FilePdf,
  FilePpt,
  FileXls,
  FileZip,
} from "../../public/svg/icon";

export default function DocumentsComponent() {
  const { getDocuments } = Documents;
  const [loading, setLoading] = useState(null);
  const [documents, setDocuments] = useState(null);

  const selectIcon = (iconName) => {
    switch (iconName) {
      case "FileDoc":
        return <FileDoc className="fn__svg" />;
      case "FileMp3":
        return <FileMp3 className="fn__svg" />;
      case "FileMp4":
        return <FileMp4 className="fn__svg" />;
      case "FilePdf":
        return <FilePdf className="fn__svg" />;
      case "FilePpt":
        return <FilePpt className="fn__svg" />;
      case "FileXls":
        return <FileXls className="fn__svg" />;
      case "FileZip":
        return <FileZip className="fn__svg" />;
      default:
        return null;
    }
  };

  const getAllDocuments = () =>
    getDocuments()
      .then(setDocuments)
      .catch((error) => toast.error("¡Error!, " + error.message))
      .finally(setLoading(false));

  useEffect(() => {
    setLoading(true);
    getAllDocuments();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <ul>
          {documents &&
            documents.map((dc) => (
              <li key={dc.id}>
                <div className="br_item">
                  <Link href={dc.file}>
                    <a download="" target="_blank"></a>
                  </Link>
                  <span className="icon">{selectIcon(dc.extension)}</span>
                  <span className="text">{dc.title} </span>
                </div>
              </li>
            ))}
        </ul>
      )}
    </>
  );
}

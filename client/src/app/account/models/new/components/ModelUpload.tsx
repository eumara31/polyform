import React from "react";
import Image from "next/image";
import styles from "@/app/styles/AccountPage.module.css";

type Props = {
    setModelURL: (url: string) => void;
    setModelFormat: (modelFormat: string) => void;
    setShowModelPreview: (showModelPreview: boolean) => void;
    setModelFile: (file: File) => blob
};

export default function ModelUpload({setModelURL, setModelFormat, setShowModelPreview, setModelFile}: Props) {
    function handleModelUpload(e: React.ChangeEvent<HTMLInputElement>){
        const model = e.target.files[0];
        if(model){
            const format = model.name.split('.').pop().toLowerCase();
            const url = URL.createObjectURL(model);
            setModelFormat(format);
            console.log(format);
            setModelURL(url);
            setShowModelPreview(true);
            setModelFile(model);
        }
    }

    return (
    <>
      <input
        onChange={(e)=>handleModelUpload(e)}
        id="model-upload"
        type="file"
        name="model"
      ></input>
      <label htmlFor="model-upload" id={styles["custom-model-input"]}>
        <div
          style={{
            fontSize: "48px",
          }}
        >
          <Image src="/img/add_model.svg" width={32} height={32} alt="" />
        </div>
        <div>загрузить модель</div>
      </label>
    </>
  );
}

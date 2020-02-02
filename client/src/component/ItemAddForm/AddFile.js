import React, { useState, useEffect } from 'react';
import ServerKip from "../../services/services";

const AddFile = () => {
    const serv = new ServerKip();
    const [selectedFile, setSelectedFile] = useState(null)
   
    const fileSelectedHendler = event => {
        setSelectedFile(event.target.files[0])
    }
    const fileUploadHandler = event => {
        serv.uploadFile(selectedFile)
    }
    

    return (
        <div>
            <input type="file" onChange={fileSelectedHendler} />
            <button onClick={fileUploadHandler}>Загрузить</button>
        </div>
    );
}

export default AddFile;

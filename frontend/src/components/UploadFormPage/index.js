import './UploadFormPage.css';
import {useDropzone } from 'react-dropzone';
import { useCallback } from 'react';

const UploadFormPage = () => {

    const onDrop = useCallback(accpetedFiles => {
        // Do something here with dropped files
        console.log("Drop it like its hot")
    })

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    return (
        <div className='upload-container' {...getRootProps()}>
            <div className='upload-area' >
                <input {...getInputProps()} />
                    {
                        isDragActive ? 
                        <p>Drop files here</p> :
                        <p>Drag and Drop your tracks and albumns here</p>
                    }
            </div>
        </div>
    )
}

export default UploadFormPage;
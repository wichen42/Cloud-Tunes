import './UploadFormPage.css';
import {useDropzone } from 'react-dropzone';
import { useCallback } from 'react';

const UploadFormPage = () => {

    const onDrop = useCallback(accpetedFiles => {
        // Do something here with dropped files
        console.log("Drop it like its hot")
        accpetedFiles.forEach((file) => {
            const reader = new FileReader();
            
            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');

            reader.onload = () => {
                const res = reader.result;
                console.log(res);
            }
            reader.readAsDataURL(file);
        })
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    return (
        <div className='upload-container' >
            <div className='upload-area' {...getRootProps()}>
                <input {...getInputProps()} />
                    {
                        isDragActive ? 
                        <div className='test-div'>DROP HERE</div> :
                        <div className='upload-splash'>
                            <div>Drag and drop your tracks and albums here</div>
                            <div className='upload-splash-button'>or choose files to upload</div>
                        </div>
                    }
            </div>
        </div>
    )
}

export default UploadFormPage;
import './UploadFormPage.css';
import {useDropzone } from 'react-dropzone';
import { useCallback, useRef, useState } from 'react';

const UploadFormPage = () => {

    const [title, setTitle] = useState("");
    const [track, setTrack] = useState(null);
    const [trackUrl, setTrackUrl] = useState(null);
    const fileRef = useRef(null);

    const onDrop = useCallback(accpetedFiles => {
        // Do something here with dropped files
        console.log(accpetedFiles);
        accpetedFiles.forEach((file) => {
            const reader = new FileReader();
            
            reader.onabort = () => console.log('file reading was aborted');
            reader.onerror = () => console.log('file reading has failed');

            reader.onload = () => {
                const res = reader.result;
                console.log(res);
                setTrack(file);
                console.log(track);
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
                        <div className='drop-here'>Drop here</div> :
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
import './UploadFormPage.css';
import {useDropzone } from 'react-dropzone';
import { useCallback, useEffect, useRef, useState } from 'react';
import UploadInputForm from '../UploadInputForm';

const UploadFormPage = () => {

    const [track, setTrack] = useState(null);
    const [trackUrl, setTrackUrl] = useState(null);
    const [files, setFiles] = useState([]);
    
    const onDrop = useCallback(acceptedFiles => {

        setFiles(prev => ([...prev, ...acceptedFiles]));

        // setFiles(prev => [...prev, ...acceptedFiles]);
        setFiles(acceptedFiles);
        acceptedFiles.forEach((file) => {
            const fileReader = new FileReader();
            fileReader.onabort = () => console.log('file reading was aborted');
            fileReader.onerror = () => console.log('file reading has failed');
    
            fileReader.onload = () => {
                const res = fileReader.result; // url
                setTrack(file);
                setTrackUrl(res);
            }
            fileReader.readAsDataURL(file);
        })
    }, []);
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
    

    return (
        <div className='upload-container' >
            <div className='upload-area' {...getRootProps()} >
                <input type="file" {...getInputProps()} />
                    {
                        isDragActive ? 
                        <div className='drop-here'>Drop here</div> :
                        <div className='upload-splash'>
                            <div>Drag and drop your tracks and albums here</div>
                            <div className='upload-splash-button'>or choose files to upload</div>
                        </div>
                    }
            </div>
            
            {files.length > 0 && <UploadInputForm track={track} close={() => setFiles([])}/>}

        </div>
    )
}

export default UploadFormPage;
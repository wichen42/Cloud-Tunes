import './UploadFormPage.css';
import {useDropzone } from 'react-dropzone';
import { useCallback, useEffect, useRef, useState } from 'react';

const UploadFormPage = () => {

    const [track, setTrack] = useState(null);
    const [trackUrl, setTrackUrl] = useState(null);
    const [files, setFiles] = useState([]);
    
    const onDrop = useCallback(acceptedFiles => {

        setFiles(prev => ([...prev, ...acceptedFiles]));

        console.log("---------");
        console.log(acceptedFiles[0]); // file object
        console.log("---------");

        // setFiles(prev => [...prev, ...acceptedFiles]);
        setFiles(acceptedFiles);
        acceptedFiles.forEach((file) => {
            const fileReader = new FileReader();
            console.log(file);
            fileReader.onabort = () => console.log('file reading was aborted');
            fileReader.onerror = () => console.log('file reading has failed');
    
            fileReader.onload = () => {
                const res = fileReader.result; // url
                console.log(file); // file object
                setTrack(file);
                setTrackUrl(res);
            }
            fileReader.readAsDataURL(file);
        })
    }, []);
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
    
    const handleClick = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('post[title]', track.path);
    }

    console.log(files); // [file]
    //TODO: when file is dropped or uploaded render input form for user to fill out track params

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
            
            <div>
                <button onClick={(e) => handleClick(e)}>TEST UPLOAD</button>
            </div>
        </div>
    )
}

export default UploadFormPage;
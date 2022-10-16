import './UploadFormPage.css';
import {useDropzone } from 'react-dropzone';
import { useCallback, useEffect, useRef, useState } from 'react';

const UploadFormPage = () => {

    const [track, setTrack] = useState(null);
    const [trackUrl, setTrackUrl] = useState(null);
    const [files, setFiles] = useState([]);
    
    // const onDrop = useCallback(accpetedFiles => {
    //     // Do something here with dropped files
    //     // console.log(accpetedFiles);

    //     accpetedFiles.forEach((file) => {
    //         const reader = new FileReader();
            
    //         reader.onabort = () => console.log('file reading was aborted');
    //         reader.onerror = () => console.log('file reading has failed');
            
    //         reader.onload = () => {
    //             const res = reader.result;
    //             // console.log(res);
    //             setTrack(file);
    //             setTrackUrl(res.result);
    //             console.log(file);
    //             console.log(res);
    //             console.log(track);
    //             console.log(trackUrl);
    //         }
    //         reader.readAsDataURL(file);
    //     })
    // }, [])
    const onDrop = useCallback(acceptedFiles => {
        console.log("---------");
        console.log(acceptedFiles[0]);
        console.log("---------");

        // setFiles(prev => [...prev, ...acceptedFiles]);
        setFiles(acceptedFiles);
        acceptedFiles.forEach((file) => {
            const fileReader = new FileReader();
        
            fileReader.onabort = () => console.log('file reading was aborted');
            fileReader.onerror = () => console.log('file reading has failed');
    
            fileReader.onload = () => {
                const res = fileReader.result; // url
                console.log(file.path); // file object
                setTrack(file);
                setTrackUrl(res);
                // console.log(typeof res);
                // const blob = new Blob([res]);
            }
            fileReader.readAsDataURL(file);
        })
        // console.log(files);
    }, []);
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
    
    const handleClick = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('post[title]', track.path);
    }

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
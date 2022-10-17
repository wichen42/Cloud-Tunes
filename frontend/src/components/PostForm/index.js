import { useRef, useState } from 'react';
import csrfFetch from '../../store/csrf';

function PostForm () {
  const [title, setTitle] = useState ("");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const fileRef = useRef(null);

  const handleFile = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        console.log("--------");
        console.log(file); // file object {name: meme.jpg, lalstModified...}
        console.log("--------");

        setPhotoFile(file);
        setPhotoUrl(fileReader.result);

        console.log(photoFile);
        console.log(photoUrl);
      };
    }
  }
  const handleInput = e => {
    setTitle(e.currentTarget.value);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('post[title]', title);
    // console.log(photoFile); // formData
    if (photoFile) {
        formData.append('post[photo]', photoFile);
        // console.log(formData);
    }
    const response = await csrfFetch('/api/posts', {
        method: 'POST',
        body: formData
      });
    if (response.ok) {
        // console.log("photoFile" + photoFile);
        // console.log("title " + title);
        // console.log("photoUrl " + photoUrl);
        const message = await response.json();
        console.log(message.message);
        setTitle("");
        setPhotoFile(null);
        setPhotoUrl(null);
        fileRef.current.value = null;
    }
  }

  const preview = photoUrl ? <img src={photoUrl} alt="" /> : null;

  return (
    <div className='postform-container'>
      <form onSubmit={handleSubmit}
      className='post-form'
      >
        <label htmlFor="post-title">Title of Post</label>
        <input type="text"
          id="post-title"
          value={title}
          onChange={handleInput}/>
        <input type="file" 
        ref={fileRef}
        onChange={handleFile}/> 
        {preview}
        <br />
        <button>Make a new Post!</button>
      </form>
    </div>

  );
}

export default PostForm;
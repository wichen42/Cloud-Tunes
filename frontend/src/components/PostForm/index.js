import { useState } from 'react';
import csrfFetch from '../../store/csrf';

function PostForm () {
  const [title, setTitle] = useState ("");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoURL, setPhotoUrl] = useState(null);

  const handleFile = e => {
    const file = e.currentTarget.files[0];
    setPhotoFile(file);
  }

  const handleInput = e => {
    setTitle(e.currentTarget.value);
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('post[title]', title);
    if (photoFile) {
        formData.append('post[photo]', photoFile);
    }
    const response = await csrfFetch('/api/posts', {
        method: 'POST',
        body: formData
      });
    if (response.ok) {
        const message = await response.json();
        console.log(message.message);
        setTitle("");
        setPhotoFile(null);
        setPhotoUrl(null);
    }
  }


  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="post-title">Title of Post</label>
      <input type="text"
        id="post-title"
        value={title}
        onChange={handleInput}/>
      <input type="file" onChange={handleFile}/> 
      <button>Make a new Post!</button>
    </form>
  );
}

export default PostForm;
import './UploadInputForm.css';

const UploadInputForm = () => {
    return ( 
        <form>
            <label>
                Title:
                <input type="text" placeholder='Title' />
            </label>
            
            <p>Permalink*
                <br />
                localhost.com/username/song-name
            </p>

            <label>
                Genre:
                <input type="text" placeholder='Genre' />
            </label>

            <label>
                Description:
                <textarea placeholder='Describe your track'></textarea>
            </label>

            <button>Cancel</button>
            <button>Save</button>
        </form>
     );
}
 
export default UploadInputForm;
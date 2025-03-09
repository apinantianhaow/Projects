import React, {useState} from "react";
import axios from "axios";

const UploadForm = () => {
    const [title, setTitle] = upseState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", image);

        try {
            const res = await axios.post("http://localhost:5000/upload", formData, {headers: {"Content-Type": "multipart/form-data"}, 
            });
            alert("Upload Success!");
        } catch(error){
            alert("Upload Failed");
        }
    };

    return(
        <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", width: "300px"}}>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <input type="file" onChange={handleImageChange}/>
            <button type="submit">Upload</button>
        </form>
    );

};
export default UploadForm;
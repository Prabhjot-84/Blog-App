import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {useState} from "react";
import { useNavigate } from 'react-router-dom';
// import Editor from "../Editor";

export default function CreatePost() {

    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content,setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
    const nav = useNavigate();

    const modules = {
        toolbar: [
          [{ header: [1, 2, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image'],
          ['clean'],
        ],
    };

    
    async function createNewPost(e){
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);

        e.preventDefault();
        
        const response = await fetch('http://localhost:4000/post', {
        method: 'POST',
        body: data,
        credentials: 'include',
        });
        if (response.ok) {
            setRedirect(true);
        }
    }


    if (redirect) {
        nav("/");
    }


    return (
        <form onSubmit={createNewPost} >
            <input type="title" placeholder={'Title'} value={title}
                    onChange={e => setTitle(e.target.value)} />
            <input type="summary" placeholder={'Summary'} value={summary}
                    onChange={e => setSummary(e.target.value)} />
            
            {/* added input type file for user to add image for cover */}
            <input className="file_input" type="file"
                    onChange={e => setFiles(e.target.files)} />
                    
            {/* <Editor value={content} onChange={setContent} /> */}
            <ReactQuill value={content} modules={modules} theme="snow"
                    onChange={newValue => setContent(newValue) }/>

            <button className="create_post_btn">Create post</button>
        </form>
    );
}
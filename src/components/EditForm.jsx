import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { baseApiUrl } from "../constants.js";


const EditForm = () => {
  const [post, setPost] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const { id } = useParams();
  
  const authString = btoa("wp-react:Mjyv rDpX jX2C iVMo nj3M A4Tm");


  useEffect(() => {
    fetch(`${baseApiUrl}/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPost(data);
        setNewTitle(data.title.rendered);
        setNewContent(data.content.rendered);
      });
  }, [id]);



  const deletePost = () => {
    fetch(`${baseApiUrl}/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authString}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error while deleting");
        }
        window.alert("Post successfully deleted!");
      })
      .catch((error) => {
        console.error("Error while deleting:", error);
      });
  };

  const handleSave = () => {
    const updatedPost = {
      title: newTitle,
      content: newContent,
    };

    fetch(`${baseApiUrl}/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authString}`,
      },
      body: JSON.stringify(updatedPost),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Impossibile aggiornare il post");
        }
        window.alert("Post successfully updated!");
      })
      .catch((error) => {
        console.error("Errore durante l'aggiornamento del post:", error);
      });
  };

  return (
    post && (
      <>
        <Container style={{ maxWidth: '60%' }} className="mt-4">
  
  
            <Form.Group controlId="formTitle" className="mb-3">
            <Form.Label className="fs-3">Title</Form.Label>
              <Form.Control type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formContent" className="mb-3">
            <Form.Label className="fs-3">Content</Form.Label>
              <Form.Control as="textarea" defaultValue={newContent} onChange={(e) => setNewContent(e.target.value)} />
            </Form.Group>
      
            <Button variant="primary" onClick={handleSave} className="me-2">
              Salva
            </Button>
            <Button variant="danger" onClick={deletePost}>
              Elimina
            </Button>
            </Container>
 
      </>
    )
  );
};

export default EditForm;
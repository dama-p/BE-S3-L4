import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { baseApiUrl } from "../constants.js";


const PostDetails = () => {
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const { id } = useParams();

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


  const authString = btoa("wp-react:Mjyv rDpX jX2C iVMo nj3M A4Tm");
 
  

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
          throw new Error("Impossibile eliminare il post");
        }
        console.log("Post eliminato con successo");
      })
      .catch((error) => {
        console.error("Errore durante l'eliminazione del post:", error);
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
        console.log("Post aggiornato con successo");
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Errore durante l'aggiornamento del post:", error);
      });
  };

  return (
    post && (
      <>
        <Container>
          <h1 className="text-center display-3 fw-bold">{post.title.rendered}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }}></div>

          <div className="d-flex justify-content-end mt-4">
            <Button variant="danger" onClick={deletePost}>
              Elimina
            </Button>

            <Button className="ms-3" variant="primary" onClick={() => setShowModal(true)}>
              Modifica
            </Button>
          </div>
        </Container>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Modifica Contenuto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formTitle">
              <Form.Label>Titolo</Form.Label>
              <Form.Control type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formContent">
              <Form.Label>Contenuto</Form.Label>
              <Form.Control as="textarea" defaultValue={newContent} onChange={(e) => setNewContent(e.target.value)} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Annulla
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Salva
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  );
};

export default PostDetails;
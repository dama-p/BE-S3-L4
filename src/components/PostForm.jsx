import { useState } from "react";
import { baseApiUrl } from "../constants.js";
import { Container, Button, Modal, Form, Row, Col } from "react-bootstrap";


const PostForm = () => {
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const authString = btoa("wp-react:Mjyv rDpX jX2C iVMo nj3M A4Tm");
    fetch(`${baseApiUrl}/posts/`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Basic ${authString}` },
      body: JSON.stringify({
        title: newTitle,
        content: newContent,
        status: "publish",
      }),
    })
      .then((res) => {
        console.log("Here's the response", res);
        if (res.ok) {
          window.alert("New post added!");
          setNewTitle("");
          setNewContent("");
        } else {
          throw new Error("Network response was not ok");
        }
      })

      .catch((error) => {
        console.error("Failed to add the new post:", error);
      });
  };

  return (

    <>
    <Container>


        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" required value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formContent">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" required value={newContent} onChange={(e) => setNewContent(e.target.value)} />
        </Form.Group>
  
        <Button variant="primary" onClick={handleSubmit}>
          Salva
        </Button>

        </Container>

  </>

  );
};

export default PostForm;

import type { FC } from 'react';
import { Card, Col, Button, Row } from "react-bootstrap";
import { priorityLabels } from "../../models/helpRequest.model";

interface RequestCardProps {
  item: any;
  user: any;
  onDeleteRequest: (id: string) => void;
  onAssign: (item: any) => void;
}

const RequestCard: FC<RequestCardProps> = (props) => (
 <Card className="h-100 w-100 shadow-sm">
    <Card.Body className="d-flex flex-column">
      <Row className="align-items-center mb-2">
        <Col className="col-10">
          <Card.Title className="m-0">קריאה {props.item._id}</Card.Title>
        </Col>
        <Col className="col-2 text-start">
          {props.user?.role === "admin" && (
            <Button
              className="bg-white border-white p-0 text-danger"
              onClick={() => props.onDeleteRequest(props.item._id)}
            >
              <i className="bi bi-trash3"></i>
            </Button>
            
          )}
     
        </Col>
      </Row>

      <Card.Subtitle className="mb-2 text-muted">
        מיקום: {props.item.location?.name}
      </Card.Subtitle>

      <Card.Text className="flex-grow-1">{props.item.problemDescription}</Card.Text>

      <Card.Text>
        דחיפות:{" "}
        {props.item.priority
          ? priorityLabels[props.item.priority] || "לא ידועה"
          : "לא נקבעה"}
      </Card.Text>

      <Button
        className="bg-light border-warning text-black w-100 mt-auto"
        disabled={props.item.status === "הסתיים"}
        onClick={() => props.onAssign(props.item)}
      >
        {props.item.status || "לא ידוע"}
      </Button>
    </Card.Body>
  </Card>
);

export default RequestCard;

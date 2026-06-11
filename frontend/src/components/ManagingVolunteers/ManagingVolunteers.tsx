import { useEffect, useState, type FC } from "react";
import "./ManagingVolunteers.scss";
import type { Volunteer } from "../../models/volunteers.model";
import volunteersService from "../../services/volunteers.service";
import { Card, Row, Col, Button } from "react-bootstrap";

interface ManagingVolunteersProps {}

const ManagingVolunteers: FC<ManagingVolunteersProps> = () => {
  const [listVolunteers, setListVolunteers] = useState<Volunteer[]>([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [volunteersRes] = await Promise.all([
          volunteersService.getVolunteersList(),
        ]);

        setListVolunteers(volunteersRes.data.data);
      } catch (error) {
        // setError("חלק מהנתונים לא נטענו בהצלחה");
      }
    };

    fetchAllData();
  }, []);


const  deleteVolunteer = async(id: string)=>
{
  const item = await volunteersService.deleteVolunteer(id)
  if(item)
    alert("המתנדב נמחק בהצלחה")
  //לעשות רענון לדף
  else
   alert("שגיאה במחיקה")
}

  return (
    <div className="ManagingVolunteers m-4">
      <Row className="g-5">
        {listVolunteers &&
          listVolunteers.map((item) => (
            <Col key={item._id} xs={12} sm={6} md={6} >
              <Card className="h-100 shadow-sm ">
                <Card.Body>
                   <Row className="align-items-center mb-2">
                  <Col className="col-10">
                  <Card.Title>
                    {" "}
                    {item.lastName} {item.firstName}
                  </Card.Title>
                  </Col>
                  {/* לעשות עם חלונית האם בטוח למחוק... */}
                  <Col className="col-2 text-start">
                  <Button className="bg-white border-white p-0 text-danger" onClick={() => {deleteVolunteer(item._id)}}><i className="bi bi-trash3"></i></Button>
                  </Col>
                  </Row>
                  <Card.Subtitle className="mb-2 text-muted">
                    {item.tz}
                  </Card.Subtitle>
                  <Card.Text>{item.specialties}</Card.Text>

                  <Card.Text>
                    {" "}
                    טלפון: {item.phone} - מייל: {item.email}
                  </Card.Text>
                  
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

export default ManagingVolunteers;

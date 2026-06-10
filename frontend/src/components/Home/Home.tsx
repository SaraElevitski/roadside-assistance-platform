import { useEffect, useState, type FC } from "react";
import "./Home.scss";
import volunteersService from "../../services/volunteers.service";
import { Card, Row, Col, Button } from "react-bootstrap";
import helpRequestsService from "../../services/helpRequests.service";
import type { Volunteer } from "../../models/volunteers.model";
import { priorityLabels } from "../../models/helpRequest.model";





interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const [listVolunteers, setListVolunteers] = useState<Volunteer[]>([]);
  const [listRequest, setListRequests] = useState<any[]>([]);


  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [volunteersRes, requestsRes] = await Promise.all([
          volunteersService.getVolunteersList(),
          helpRequestsService.getRequestsList(),
        ]);

        setListVolunteers(volunteersRes.data.data);
        setListRequests(requestsRes.data.data);
      } catch (error) {
        // setError("חלק מהנתונים לא נטענו בהצלחה");
      }
    };

    fetchAllData();
  }, []);


 const assign = ()=>{

 }

  return (
    <div className="Home m-4">
      <Button variant="danger w-100 mb-4 ">הוספת קריאה</Button>
      <Row className="g-4">
        {listRequest &&
          listRequest.map((item) => (
            <Col key={item._id} xs={12} sm={6} md={3}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>קריאה {item._id}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    מיקום: {item.location.name}
                  </Card.Subtitle>
                  <Card.Text>{item.problemDescription}</Card.Text>
                  <Card.Text>
                   דחיפות: {item.priority ? (priorityLabels[item.priority] || 'לא ידועה') : 'לא נקבעה'}
                  </Card.Text>
                  
                  <Button className="bg-light border-warning text-black" onClick ={()=> assign()} ><Card.Text >{item.status ?  item.status : 'לא ידוע'}</Card.Text></Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </div>
  );
};

// peopleStuck
// status
// contactPhone
// location

export default Home;

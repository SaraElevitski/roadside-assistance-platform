import { useEffect, useState, type FC } from "react";
import './HelpRequests.scss';
import helpRequestsService from "../../services/helpRequests.service";
import { Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import RequestCard from "../RequestCard/RequestCard";
import type { HelpRequest } from "../../models/helpRequest.model";

interface HelpRequestsProps {}

const HelpRequests: FC<HelpRequestsProps> = () => {
  const [listRequest, setListRequests] = useState<any[]>([]);
  const user = useSelector((state: any) => state.user.user?.data);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [requestsRes] = await Promise.all([
          helpRequestsService.getRequestsList(),
        ]);
        setListRequests(requestsRes.data.data);
      } catch (error) {
        // setError("חלק מהנתונים לא נטענו בהצלחה");
      }
    };
    fetchAllData();
  }, []);

  const deleteRequest = async (id: string) => {
    const item = await helpRequestsService.deleteRequest(id);
    if (item) alert("המתנדב נמחק בהצלחה");
    else alert("שגיאה במחיקה");
  };

  const assign = async (item: HelpRequest) => {
  // 1. קביעת הסטטוס החדש
  const newStatus = item.status === "בטיפול" ? "הסתיים" : "בטיפול";

  try {
    // 2. קריאה לשרת
    const res = await helpRequestsService.assignVolunteer(item._id, user._id, newStatus);

    if (res) {
      // 3. עדכון ה-State של הרשימה
      setListRequests(prevList => 
        prevList.map(req => 
          // אם זה הכרטיס ששינינו - נחליף לו את הסטטוס, אחרת נשאיר אותו כמו שהוא
          req._id === item._id ? { ...req, status: newStatus } : req
        )
      );
    }
  } catch (error) {
    
    alert("שגיאה בעדכון הסטטוס");
  }
};


  return (
    <div className="HelpRequests m-4">
      <Button variant="danger" className="w-100 mb-4">
        הוספת קריאה
      </Button>
      <Row className="g-4 align-items-stretch">
        {listRequest &&
          listRequest.map((item) => (
            <Col key={item._id} xs={12} sm={6} md={3} className="d-flex">
              <RequestCard
                item={item}
                user={user}
                onDeleteRequest={deleteRequest}
                onAssign={assign}
              />
            </Col>
          ))}
      </Row>
    </div>
  );
};

 export default HelpRequests;


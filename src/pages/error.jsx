import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, Result } from 'antd';
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
      <Result
    status="403"
    title="Oops!"
    subTitle={error.statusText || error.message}
    extra={<Button type="primary">
      <Link to ='/'>
        <span>back to homepage</span>
        </Link>
    </Button>}
  />
  
  );
}

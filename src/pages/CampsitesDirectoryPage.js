import { Container, Row } from 'reactstrap';
import CampsitesList from '../features/campsites/CampsitesList';
import SubHeader from '../components/SubHeader';


const CampsitesDirectoryPage = () => {
    return (
        <Container>
            <SubHeader current='Directroy' />
            <Row>
                <CampsitesList />
            </Row>
        </Container>
    );
};

export default CampsitesDirectoryPage;
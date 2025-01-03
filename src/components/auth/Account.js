import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import { withRouter } from 'react-router-dom'

import { primary, light } from '../styled/colors'
import Link from '../styled/Links'
// import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import OrderHistory from '../orders/OrderHistory'
// import OrderDetail from '../orders/OrderDetails'

import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import ChangePassword from './ChangePassword'

const TabLink = styled(Nav.Link)`
  margin: 0.25em 0;

  &:hover, &:focus {
    background: ${lighten(0.7, primary)};
    cursor: pointer;
  }
`

const TabContainer = styled.div`
  width: 100%;
  height: 60vh;
  min-height: 600px;
  padding: 0 2rem;
`

// Contains change password, sign out, order history, preferences...
const Account = (props) => {
  return (
    <TabContainer>
      <Tab.Container className="border-soft" defaultActiveKey="settings">
        <Row className="h-100">
          <Col className="" sm={3} style={{ borderRight: `1px solid ${light}` }}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <TabLink eventKey="settings">Account Settings</TabLink>
              </Nav.Item>
              <Nav.Item>
                <TabLink
                  eventKey="orderHistory"
                >Order History</TabLink>
              </Nav.Item>
              <Nav.Item className="text-center mt-2">
                <Link to='/sign-out'>Sign Out</Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col className="bg-info p-4 rounded-2" sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="settings">
                <>
                  <h4>Update your data:</h4>
                  <hr/>
                  <ChangePassword
                    {...props}
                  />
                </>
              </Tab.Pane>
              <Tab.Pane eventKey="orderHistory">
                <>
                  <h4>Order history:</h4>
                  {/* <AuthenticatedRoute
                    path={props.match.path + '/orders/:id'}
                    exact
                    render={() => <OrderDetail {...props}/>}
                  /> */}
                  <OrderHistory {...props}/>
                </>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </TabContainer>
  )
}

export default withRouter(Account)

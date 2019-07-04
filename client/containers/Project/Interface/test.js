import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { Route, matchPath } from 'react-router-dom';
import { connect } from 'react-redux';
const { Content, Sider } = Layout;

import './interface.scss'; 
 
import InterfaceColMenu from './InterfaceCol/InterfaceColMenu.js';
import InterfaceColContent from './InterfaceCol/InterfaceColContent.js';
import InterfaceCaseContent from './InterfaceCol/InterfaceCaseContent.js';
import { getProject } from '../../../reducer/modules/project';
import { setColData } from '../../../reducer/modules/interfaceCol.js';
const contentRouter = {
  path: '/project/:id/test/:action/:actionId',
  exact: true
};

const InterfaceRoute = props => {
  let C;
  if (props.match.params.action === 'col') {
    C = InterfaceColContent;
  } else if (props.match.params.action === 'case') {
    C = InterfaceCaseContent;
  }
  return <C {...props} />;
};

InterfaceRoute.propTypes = {
  match: PropTypes.object
};

@connect(
  state => {
    return {
      isShowCol: state.interfaceCol.isShowCol
    };
  },
  {
    setColData,
    getProject
  }
)
class Test extends Component {
  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object,
    isShowCol: PropTypes.bool,
    getProject: PropTypes.func,
    setColData: PropTypes.func
    //fetchInterfaceColList: PropTypes.func
  };

  constructor(props) {
    super(props);
    // this.state = {
    //   curkey: this.props.match.params.action === 'api' ? 'api' : 'colOrCase'
    // }
  }

  
  async componentWillMount() {
    this.props.setColData({
      isShowCol: true
    });
    //await this.props.fetchInterfaceColList(this.props.match.params.id)
  }
  render() { 

    return (
      <Layout style={{ height: 'calc(100vh - 0.56rem)' }}>
        <Sider style={{ backgroundColor: '#424242' }} width={300}>
          <div className="left-menu">            
            <InterfaceColMenu
                router={matchPath(this.props.location.pathname, contentRouter)}
                projectId={this.props.match.params.id}
              />
          </div>
        </Sider>
        <Layout>
          <Content
            style={{
              height: '100%', 
              overflow: 'initial',
              backgroundColor: '#fff'
            }}
          >
            <div className="right-content">
              <Route {...contentRouter} component={InterfaceRoute} />
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Test;

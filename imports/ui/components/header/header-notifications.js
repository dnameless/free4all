import React from 'react';
import { browserHistory } from 'react-router';
import * as Colors from 'material-ui/styles/colors';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Popover from 'material-ui/Popover';
import NotificationsList from './notifications-list';

export class HeaderNotifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleOnTouchTap(event) {
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose() {
    this.setState({ open: false });
  }

  handleNotificationTouchTap(id, url) {
    const self = this;
    return function(event) {
      // Prevent ghost clicks
      event.preventDefault();

      // Close the popover
      self.setState({ open: false })

      // Set as read
      Herald.collection.update(id, { $set: { read: true } });

      // Follow link
      if (url && url.length) {
        if (url.charAt(0) == "/")
          browserHistory.push(url);
        else
          window.location = url;
      }
    }
  }

  render() {
    return (
      <div id="header-notifications">
        <Badge
          style={{ padding:0 }}
          badgeStyle={{ height:20, width:20, backgroundColor: 'rgba(255, 255, 255, 0.65)', color:'#045d68' }}
          badgeContent={ this.props.notificationCount }>
          <IconButton onTouchTap={ this.handleOnTouchTap.bind(this) }>
            <FontIcon className="material-icons" color={ Colors.grey50 }>notifications</FontIcon>
          </IconButton>
        </Badge>

        <Popover
          open={ this.state.open }
          anchorEl={ this.state.anchorEl }
          onRequestClose={ this.handleRequestClose.bind(this) }
          anchorOrigin={{"horizontal":"right","vertical":"bottom"}}
          targetOrigin={{"horizontal":"right","vertical":"top"}}>
          <NotificationsList
            notifications={ this.props.notifications }
            handleNotificationTouchTap={ this.handleNotificationTouchTap.bind(this) } />
        </Popover>
      </div>
    );
  }
}

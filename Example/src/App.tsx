import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';

import { Switch, Route, Link as RouterLink } from 'react-router-dom';

import Triangle from './component/Basic/Triangle/Triangle';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
  },
  toolbar: theme.mixins.toolbar,
}));

function App() {
  const classes = useStyles();
  const [basicExpand, setBasicExpand] = useState(false);

  const onExpandBasic = (event) => {
    event.preventDefault();
    setBasicExpand(!basicExpand);
  };

  return (
    <div>
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              WebGPU Example
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <Divider />
          <List
            subheader={
              <ListSubheader>
                Basic
                <IconButton onClick={onExpandBasic}>
                  {basicExpand ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </ListSubheader>
            }
          >
            <Collapse in={basicExpand} timeout="auto" unmountOnExit={false}>
              <ListItem
                button
                key={0}
                component={RouterLink}
                to="/Bacis_Triangle"
              >
                Triangle
              </ListItem>
            </Collapse>
          </List>
        </Drawer>
        <div className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/Bacis_Triangle" component={Triangle} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;

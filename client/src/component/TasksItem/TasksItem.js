import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';

import "./TasksItem.css";



export default function TasksItem(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : true);
  };


  if(props) {

    const {position, object, failure, fix, panel, start, finish, name} = props;


    const firmatTime = (time) => {
      if (time < 10) {
        return time = "0" + time}
      else return time
    }


    const timeStart = `${firmatTime(new Date(start).getHours())}:${firmatTime(new Date(start).getMinutes())}`;
    const timeFinish = `${firmatTime(new Date(finish).getHours())}:${firmatTime(new Date(finish).getMinutes())}`;
    

    return (

        <ExpansionPanel className="workShopItem" expanded={expanded === panel} onChange={handleChange(panel)}>
          <ExpansionPanelSummary
                    aria-controls={`${panel}bh-content`}
                    id={`${panel}bh-header`}
                  >
                  <div className="workShopItem">
                    <div className="workShopItem--title">
                      <span className="workShopItem--time"> {`${timeStart} - ${timeFinish}`} </span>
                      <span className="workShopItem--subtitle">{position}</span>
                    </div>
                    <div className="workShopItem--title">
                      <span className="workShopItem--object"> {object} </span>
                    </div>
                    <div className="workShopItem--title">
                      <span className="workShopItem--person"> {name.join(", ")} </span>
                    </div>
                  </div>
                  </ExpansionPanelSummary>
                  <span className="workShopItem--comment"> Неисправность: </span>
                  <ExpansionPanelDetails>
                  <Typography>
                      {failure}
                    </Typography>
                  </ExpansionPanelDetails>
                  <span className="workShopItem--comment"> Корректирующие действия: </span>
                  <ExpansionPanelDetails>
                    <Typography>
                      {fix}
                    </Typography>
                  </ExpansionPanelDetails>
          </ExpansionPanel>
        );
    }
}

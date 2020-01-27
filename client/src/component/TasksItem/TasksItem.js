import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';

import "./TasksItem.css";



export default function WorkShopItem(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : true);
  };


  if(props) {

    const {position, object, failure, fix, panel} = props;
    
    return (


<>
        <ExpansionPanel className="workShopItem" expanded={expanded === panel} onChange={handleChange(panel)}>
          <ExpansionPanelSummary
                    aria-controls={`${panel}bh-content`}
                    id={`${panel}bh-header`}
                  >
                  <div className="workShopItem">
                    <div className="workShopItem--title">
                      <span className="workShopItem--time"> 21:40 - 21:55 </span>
                      <span className="workShopItem--subtitle">{position}</span>
                    </div>
                    <div className="workShopItem--title">
                      <span className="workShopItem--object"> {object} </span>
                    </div>
                    <div className="workShopItem--title">
                      <span className="workShopItem--person"> Лупач, Сергиеня, Комаров </span>
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

          <ExpansionPanel expanded={expanded === panel} onChange={handleChange(panel)}>
          <ExpansionPanelSummary
                    aria-controls={`${panel}bh-content`}
                    id={`${panel}bh-header`}
                  >
                  <div className="workShopItem">
                    <div className="workShopItem--title">
                      <span className="workShopItem--time"> 21:40 - 21:55 </span>
                      <span className="workShopItem--subtitle">{position}</span>
                    </div>
                    <div className="workShopItem--title">
                      <span className="workShopItem--object"> {object} </span>
                    </div>
                    <div className="workShopItem--title">
                      <span className="workShopItem--person"> Лупач, Сергиеня, Комаров </span>
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
           </>      
        );
    }
}

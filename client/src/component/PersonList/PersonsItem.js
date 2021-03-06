import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import EditPerson from "./EditPerson";
import DialogActions from '@material-ui/core/DialogActions';


export default function PersonsItem({name, surname, phone, position, panel, _id, deleteItem, updatePersons}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const deletePerson = async () => {
    deleteItem(_id, "persons");
    setTimeout(() => {
      updatePersons();
    }, 2000);
  }

  return (
    <>
    <br/>
        <ExpansionPanel expanded={expanded === panel} onChange={handleChange(panel)}>

            <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            >
            <Typography >
              <span className="workShopItem--person"> {`${surname} ${name}`} </span>
              </Typography>
            </ExpansionPanelSummary>

            <ExpansionPanelDetails>
                <div className="personDetails">
                    <span ><a className={"persotDetails-phone"}  href={`tel:${phone}`}> {`Телефон:  ${phone}`} </ a></span>
                    <span>{`Должность:  ${position}`}</span>
                </div>

          </ExpansionPanelDetails>
            <DialogActions>
              <EditPerson   
                  name={name} surname={surname} phone={phone}
                  position={position} id={_id}
                  updatePersons={updatePersons}
              />

              <Button  onClick={deletePerson}  color="primary">
                    <h5>удалить</h5>
              </Button>
            </DialogActions>
        </ExpansionPanel>
      </>
  );
}

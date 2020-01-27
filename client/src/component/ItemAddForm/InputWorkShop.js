import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

import Button from '@material-ui/core/Button';



const ArrWorkShops = [
    {
        object: [
            "выжимная",
            "грильяж",
            "minipack",
            "птичка",
            "рецептурка",
            "патока",
            "карамельная линия",
            "тп16",
            "весовой дозатор",
            "завертка выжимная",
            "завертка карамельная"
        ],
        _id: "5e297dc0bcc72c1938b7b622",
        name: "1й конфетный",
    },
    {
        object: [
            "156 склад",
            "Chepi",
            "Chocotech глазировка",
            "Dinnisen",
            "Mogul",
            "Sollich(Взбивная)",
            "Вафельная линия",
            "Вафельная печь",
            "Взбивная",
            "Завертка Mogul",
            "Завертка PFM",
            "Завертка вафельная",
            "Завертка карера",
            "Минипак",
            "Паточная",
            "Рецептурка 2й этаж",
            "Сырьевая (сахар, патока)",
            "Упаковка Ilapak",
            "Холодный штамп (завертка)",
            "Холодный штамп (кухня)",
            "Yamato",
            "Кухня взбивная"
        ],
        _id: "5e298128bcc72c1938b7b623",
        name: "2й конфетный",
    },
    {
        object: [
            "2 этаж темперирующая машина",
            "4 этаж принтер",
            "Варочное отделение",
            "Вафельная печь(старая)",
            "Выжимная линия",
            "Глазировка Loveras",
            "Завёртка выжимная",
            "Завертка столичная",
            "Размазка Олега",
            "Рецептурка. Миланжора",
            "Тележка Комаева",
            "Турецкая вафля",
            "Фасовка",
            "Глазировка MF Hamburg"
        ],
        _id: "5e298179bcc72c1938b7b624",
        name: "3й конфетный",
    },
    {
        object: [
            "315 линия",
            "OneShot",
            "бисерка",
            "Двухвалка",
            "завертка 50 гр",
            "Завёртка OneShot",
            "Какао порошок",
            "Какао-пресс",
            "Конвейер",
            "конш 1",
            "конш 2",
            "конш 4",
            "конш 5",
            "минипак",
            "Обжарка",
            "Президентский шоколад",
            "Пятивалка",
            "Рецептурка",
            "Рецептурка. 2 этаж",
            "конш 6",
            "теплопункт",
            "операторская"
        ],
        _id: "5e2981b1bcc72c1938b7b625",
        name: "Старый шоколадный",
    },
    {
        object: [
            "Jensen",
            "Jensen конш начинки",
            "Jensen распред конвеер",
            "ShowBox",
            "Емкость с начинкой(2т)",
            "Завёртка Jensen",
            "Завёртка Jensen LoeshPack",
            "Конш",
            "Мойка форм"
        ],
        _id: "5e2981cdbcc72c1938b7b626",
        name: "Новый шоколадный",
    }
]


const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    width: "45vw",
  }
}));

export default function InputWorkShop() {
  const classes = useStyles();
  const [workshops, setWorkshops] = React.useState(ArrWorkShops);
  const [selectedWorkshops, setSelectedWorkshops] = React.useState('Цех');
  const [selectedObject, setselectedObject] = React.useState('Объект');

  const handleChangeWorkshops = event => {
    setSelectedWorkshops(event.target.value); 
  };

  const handleChangeObject = event => {
    setselectedObject(event.target.value); 
  };



  return (
    <div>

      <FormControl className={classes.formControl}>
        <InputLabel id="demo-customized-select-label">Цех</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={selectedWorkshops}
          onChange={handleChangeWorkshops}
          input={<BootstrapInput />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        {workshops.map((item) => (<MenuItem value={item.name} key={item._id}>{item.name}</MenuItem>)) }
          <MenuItem value="">
            <Button variant="contained" className="btn-addWorkShop"> Добавить цех </Button>
          </MenuItem>
        </Select>
      </FormControl>


      <FormControl className={classes.formControl}>
        <InputLabel id="demo-customized-select-label">Объект</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={selectedObject}
          onChange={handleChangeObject}
          input={<BootstrapInput />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        {
          selectedWorkshops === 'Цех'
            ? <MenuItem value=""> <em>None</em> </MenuItem> 
            : workshops.filter((item) => item.name === selectedWorkshops)[0]
          .object.map((item, i) => (<MenuItem value={item} key={`${selectedWorkshops}object${i}`}>{item}</MenuItem>)) 
        }
          <MenuItem value="">
            <Button variant="contained" className="btn-addWorkShop"> Новый объект </Button>
          </MenuItem>
        </Select>
      </FormControl>

      {/* <button onClick={()=> {
        console.log(selectedWorkshops, selectedObject)}}>clg</button> */}
    </div>
  );
}

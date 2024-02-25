import "@src/shoes.scss";
import Constants from "@src/Constants";
import Box from "@mui/material/Box";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { selectedColorState, selectedMeshState } from "@src/atoms/Atoms";
import { useRecoilState } from "recoil";

function ColorPicker() {
  const padding = 16;
  const btnWidth = 30;
  const width = Constants.COLOR_ARRAY.length * (btnWidth + padding * 2);

  const [selectedColor, setSelectedColor] = useRecoilState(selectedColorState);
  const [selectedMesh] = useRecoilState(selectedMeshState);

  function colorClick(color: { name: string; color: string }, idx: number) {
    setSelectedColor(idx);
  }
  return (
    <Box className="color-wrapper">
      <Box className="color-inner-wrap" style={{ width }}>
        <Typography className="current-part">{selectedMesh}</Typography>
        <List className="list-wrap">
          {Constants.COLOR_ARRAY.map((color, idx) => {
            return (
              <ListItem className="color-item" key={`color-${+idx}`}>
                <IconButton
                  onClick={() => colorClick(color, idx)}
                  className={
                    selectedColor === idx ? "color-btn selected" : "color-btn"
                  }
                  style={{ backgroundColor: color.color }}
                ></IconButton>

                {selectedColor === idx ? (
                  <ListItemText className="color-name">
                    {color.name}
                  </ListItemText>
                ) : null}
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}

export default ColorPicker;

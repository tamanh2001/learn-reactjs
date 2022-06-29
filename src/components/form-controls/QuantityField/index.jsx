import { Box, FormHelperText, IconButton, makeStyles, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Controller } from 'react-hook-form';

QuantityField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,

  label: PropTypes.string,
  disable: PropTypes.bool,
};
const useStyles = makeStyles((theme) => ({
  root: {},

  typ: {
    fontSize: '15px',
  },
}));

function QuantityField(props) {
  const classes = useStyles();
  const { form, name, label } = props;
  const { control, setValue } = form;

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, error },
        }) => (
          <>
            <FormControl
              error={isTouched && invalid}
              fullWidth
              margin="normal"
              variant="outlined"
              size="small"
            >
              <Typography className={classes.typ}>{label}</Typography>
              <Box>
                <IconButton onClick={() => setValue(name, Number.parseInt(value) - 1)}>
                  <RemoveCircleOutline />
                </IconButton>

                <OutlinedInput
                  id={name}
                  error={invalid}
                  type="number"
                  label={label}
                  labelWidth={70}
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                />
                <IconButton onClick={() => setValue(name, Number.parseInt(value) + 1)}>
                  <AddCircleOutline />
                </IconButton>
              </Box>
            </FormControl>
            <FormHelperText error={invalid}>{error?.message}</FormHelperText>
          </>
        )}
      />
    </div>
  );
}

export default QuantityField;

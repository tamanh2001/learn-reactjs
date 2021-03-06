import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import QuantityField from 'components/form-controls/QuantityField';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

AddToCartForm.propTypes = {
  onSubmit: PropTypes.func,
};

function AddToCartForm({ onSubmit = null }) {
  const schema = yup.object().shape({
    quantity: yup.number().min(1, 'Please enter at least 1').required('please enter quantity'),
  });

  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    if (onSubmit) {
      await onSubmit(values); //khi chạy xong hàm này là submit thành công rồi reset
    }
  };
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <QuantityField name="quantity" label="Quantity " form={form} />

      <Button type="submit" variant="contained" color="primary" style={{ width: '200px' }}>
        Add to cart
      </Button>
    </form>
  );
}

export default AddToCartForm;

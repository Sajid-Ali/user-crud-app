/* eslint-disable react/prop-types */
import React from 'react';
import {
  Form,
  Input,
  Radio,
  Select,
  Checkbox,
  DatePicker,
  Pagination,
  Slider,
} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Search } = Input;

const makeField = Component => ({
  input,
  meta,
  children,
  hasFeedback,
  label,
  labelRight,
  ...rest
}) => {
  const hasError = meta.touched && meta.invalid;
  return (
    <FormItem
      label={label}
      validateStatus={hasError ? 'error' : 'success'}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
      style={{ marginBottom: 0 }}
    >
      <Component {...input} {...rest}>
        {children}
      </Component>
      {labelRight && <span style={{ color: '#9e9e9e' }}>{labelRight}</span>}
    </FormItem>
  );
};

const makeSliderField = Component => ({
  input,
  meta,
  children,
  hasFeedback,
  label,
  labelRight,
  ...rest
}) => {
  /* eslint-disable no-param-reassign */
  if (!input.value) input.value = 0;
  const hasError = meta.touched && meta.invalid;
  return (
    <FormItem
      label={label}
      validateStatus={hasError ? 'error' : 'success'}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
      style={{ marginBottom: 0 }}
    >
      <Component {...input} {...rest}>
        {children}
      </Component>
      {labelRight && <span style={{ color: '#9e9e9e' }}>{labelRight}</span>}
    </FormItem>
  );
};

const makeSelectField = Component => ({
  input,
  meta,
  children,
  hasFeedback,
  label,
  labelRight,
  ...rest
}) => {
  /* eslint-disable no-param-reassign */
  if (input.value !== 0 && !input.value) {
    input.value = rest.placeholder ? rest.placeholder : '';
  }
  const hasError = meta.touched && meta.invalid;
  return (
    <FormItem
      label={label}
      validateStatus={hasError ? 'error' : 'success'}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
      style={{
        marginBottom: 0,
      }}
    >
      <Component
        {...input}
        {...rest}
        style={{
          color: input.value === rest.placeholder ? '#5a5a5a' : 'white',
        }}
      >
        {children}
      </Component>
      {labelRight && <span style={{ color: '#9e9e9e' }}>{labelRight}</span>}
    </FormItem>
  );
};

const makeDateField = Component => ({
  input,
  meta,
  children,
  hasFeedback,
  label,
  labelRight,
  ...rest
}) => {
  /* eslint-disable no-underscore-dangle */
  const hasError = meta.touched && meta.invalid;
  input = {
    ...input,
    value: input.value && input.value._isValid ? input.value : null,
  };
  return (
    <FormItem
      label={label}
      validateStatus={hasError ? 'error' : 'success'}
      hasFeedback={hasFeedback && hasError}
      help={hasError && meta.error}
      style={{ marginBottom: 0 }}
    >
      <Component {...input} {...rest}>
        {children}
      </Component>
      {labelRight && <span style={{ color: '#9e9e9e' }}>{labelRight}</span>}
    </FormItem>
  );
};

export const AInput = makeField(Input);
export const ARadioGroup = makeField(RadioGroup);
export const ASelect = makeSelectField(Select);
export const ACheckbox = makeField(Checkbox);
export const ATextarea = makeField(TextArea);
export const ARangePicker = makeField(RangePicker);
export const ADatePicker = makeDateField(DatePicker);
export const ASearch = makeField(Search);
export const ASlider = makeSliderField(Slider);
export const ReduxPagination = ({ input, ...rest }) => (
  <Pagination
    name={input.name}
    onChange={page => input.onChange(page)}
    current={input.value}
    {...rest}
  />
);

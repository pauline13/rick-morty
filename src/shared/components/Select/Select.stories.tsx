import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ParseKeys } from 'i18next';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { StatusDot } from '@/shared/components';
import { STATUS_OPTIONS } from '@/shared/constants';
import type { Status } from '@/shared/types';

import { Select, type Option } from './Select';

type SelectStoryArgs = {
  initialValue: Status | '';
  disabled?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  size?: 'xl' | 'sm';
  withSuffix?: boolean;
};

const isStatus = (value: string): value is Status =>
  value === 'alive' || value === 'dead' || value === 'unknown';

const renderStatusDot = (option: Option) =>
  isStatus(option.value) ? <StatusDot status={option.value} /> : null;

const StatefulSelect = ({
  initialValue,
  disabled,
  placeholder,
  readOnly,
  size,
  withSuffix
}: SelectStoryArgs) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(initialValue);
  const translatedOptions = STATUS_OPTIONS.map((option) => ({
    ...option,
    label: t(`filters.options.${option.value}` as ParseKeys)
  }));

  return (
    <Select
      disabled={disabled}
      options={translatedOptions}
      placeholder={placeholder || t('filters.placeholder.status')}
      readOnly={readOnly}
      renderSuffix={withSuffix ? renderStatusDot : undefined}
      size={size}
      value={value}
      onChange={setValue}
    />
  );
};

const meta = {
  title: 'shared/components/Select',
  render: (args) => <StatefulSelect {...args} />,
  args: {
    initialValue: 'alive',
    size: 'xl'
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    )
  ],
  argTypes: {
    placeholder: {
      control: 'text'
    }
  }
} satisfies Meta<SelectStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    size: 'sm',
    withSuffix: false
  }
};

export const Placeholder: Story = {
  args: {
    initialValue: ''
  }
};

export const WithSuffix: Story = {
  args: {
    withSuffix: true
  }
};

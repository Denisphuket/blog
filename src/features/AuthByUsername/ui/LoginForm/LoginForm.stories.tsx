import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'app/providers/ThemeProvider';
import { LoginForm } from './LoginForm';

export default {
    title: 'features/LoginForm',
    component: LoginForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />;

export const LightLoginForm = Template.bind({});
LightLoginForm.args = {};
LightLoginForm.decorators = [ThemeDecorator(Theme.LIGHT)];

export const DarkLoginForm = Template.bind({});
DarkLoginForm.args = {};
DarkLoginForm.decorators = [ThemeDecorator(Theme.DARK)];

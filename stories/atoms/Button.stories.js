export default {
  title: 'Atoms/Button',
  tags: ['autodocs'],
  render: (args) => {
    const className = [
      'btn',
      `btn--${args.style}`,
      `btn--${args.size}`,
      args.block && `btn-widget--block-${args.block}`,
      args.alignment && `btn-widget--alignment-${args.alignment}`
    ].filter(Boolean).join(' ');

    return `
      <div class="btn-widget">
        <a 
          class="link ${className}"
          href="${args.url}"
          ${args.newTab ? 'target="_blank"' : ''}
        >${args.text}</a>
      </div>
    `;
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Button text'
    },
    url: {
      control: 'text',
      description: 'Button URL'
    },
    newTab: {
      control: 'boolean',
      description: 'Open in new tab'
    },
    style: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
      description: 'Button style'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Button size'
    },
    block: {
      control: 'select',
      options: ['left', 'center', 'right', ''],
      description: 'Block alignment'
    },
    alignment: {
      control: 'select',
      options: ['left', 'center', 'right', ''],
      description: 'Button alignment'
    }
  }
};

export const Primary = {
  args: {
    text: 'Click me',
    url: '#',
    newTab: false,
    style: 'primary',
    size: 'medium',
    block: '',
    alignment: ''
  }
};

export const Secondary = {
  args: {
    text: 'Learn More',
    url: '#',
    newTab: false,
    style: 'secondary',
    size: 'medium',
    block: '',
    alignment: ''
  }
};

export const Outline = {
  args: {
    text: 'Contact Us',
    url: '#',
    newTab: true,
    style: 'outline',
    size: 'large',
    block: 'center',
    alignment: 'center'
  }
};

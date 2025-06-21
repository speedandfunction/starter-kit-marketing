import nunjucks from 'nunjucks';
import 'aos/dist/aos.css';
import './rich-text.css';
import AOS from 'aos';
import widgetTemplate from '../../modules/content-widget-modules/rich-text-widget/views/widget.html?raw';

// Initialize AOS
if (typeof document !== 'undefined') {
  AOS.init({
    duration: 800,
    once: true
  });
}

// Set up Nunjucks environment
const env = new nunjucks.Environment(null, { autoescape: true });

// Add custom area tag for Storybook
env.addExtension('area', {
  tags: ['area'],
  parse: function(parser, nodes) {
    const tok = parser.nextToken();
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    return new nodes.CallExtension(this, 'run', args);
  },
  run: function(context) {
    // In Storybook, just return the content
    return new nunjucks.runtime.SafeString(context.ctx.content);
  }
});

// Create a mock data object that matches ApostropheCMS structure
const mockData = {
  data: {
    widget: {
      animationEffects: ''
    }
  }
};

export default {
  title: 'Widgets/RichText',
  tags: ['autodocs'],
  render: (args) => {
    // Re-initialize AOS when story updates
    setTimeout(() => {
      if (typeof document !== 'undefined') {
        AOS.refresh();
      }
    }, 100);

    // Update mock data with story args
    mockData.data.widget.animationEffects = args.animationEffects;
    
    // Render using the widget template
    return env.renderString(widgetTemplate, { ...mockData, content: args.content });
  },
  argTypes: {
    animationEffects: {
      control: 'select',
      options: ['fade-up', 'fade-down', 'fade-left', 'fade-right', 'zoom-in', 'zoom-out', 'flip-left', 'flip-right'],
      description: 'Animation effect to apply to the widget'
    },
    content: {
      control: 'text',
      description: 'HTML content for the rich text widget'
    }
  }
};

export const Default = {
  args: {
    animationEffects: 'fade-up',
    content: '<h2>Welcome to Our Website</h2><p>This is a rich text widget that supports full HTML content.</p>'
  }
};

export const WithComplexContent = {
  args: {
    animationEffects: 'zoom-in',
    content: `
      <h2>Features & Benefits</h2>
      <p>Our solution provides multiple benefits:</p>
      <ul>
        <li>Easy to use interface</li>
        <li>Responsive design</li>
        <li>Customizable options</li>
      </ul>
      <p>Contact us to learn more about how we can help your business grow.</p>
    `
  }
};

export const WithAnimation = {
  args: {
    animationEffects: 'flip-left',
    content: '<h2>Animated Content</h2><p>This content will animate in from the left when it enters the viewport.</p>'
  }
};

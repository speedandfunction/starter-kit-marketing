import nunjucks from 'nunjucks';
import 'aos/dist/aos.css';
import AOS from 'aos';
import widgetTemplate from '../../modules/content-widget-modules/pricing-widget/views/widget.html?raw';

// Initialize AOS
if (typeof document !== 'undefined') {
  AOS.init({
    duration: 800,
    once: true
  });
}

// Set up Nunjucks environment
const env = new nunjucks.Environment(null, { autoescape: true });

// Add area tag for Storybook
env.addExtension('area', {
  tags: ['area'],
  parse: function(parser, nodes) {
    const tok = parser.nextToken();
    const args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);
    return new nodes.CallExtension(this, 'run', args);
  },
  run: function(context, widget, field) {
    const content = context.ctx.areaContents[field] || '';
    return new nunjucks.runtime.SafeString(content);
  }
});

export default {
  title: 'Widgets/Pricing',
  tags: ['autodocs'],
  render: (args) => {
    // Re-initialize AOS when story updates
    setTimeout(() => {
      if (typeof document !== 'undefined') {
        AOS.refresh();
      }
    }, 100);

    // Create mock data structure matching ApostropheCMS
    const mockData = {
      data: {
        widget: {
          animationEffects: args.animationEffects,
          cards: args.cards
        }
      },
      areaContents: {
        intro: args.introContent,
        content: args.cardContent,
        buttons: args.buttonContent
      }
    };

    // Render using the widget template
    return env.renderString(widgetTemplate, mockData);
  },
  argTypes: {
    animationEffects: {
      control: 'select',
      options: ['fade-up', 'fade-down', 'fade-left', 'fade-right', 'zoom-in', 'zoom-out', 'flip-left', 'flip-right'],
      description: 'Animation effect to apply to the widget'
    },
    introContent: {
      control: 'text',
      description: 'HTML content for the intro section'
    },
    cardContent: {
      control: 'text',
      description: 'HTML content for the card content area'
    },
    buttonContent: {
      control: 'text',
      description: 'HTML content for the button area'
    },
    cards: {
      control: 'object',
      description: 'Array of pricing cards'
    }
  }
};

export const Default = {
  args: {
    animationEffects: 'fade-up',
    introContent: `
      <div class="text-center">
        <h2>Simple, transparent pricing</h2>
        <p>Choose the plan that's right for you</p>
      </div>
    `,
    cardContent: '<h3>$29/month</h3>',
    buttonContent: '<a href="#" class="btn btn--primary">Get Started</a>',
    cards: [
      {
        label: 'Basic',
        features: [
          { title: '10 Projects' },
          { title: '5GB Storage' },
          { title: 'Basic Support' }
        ]
      },
      {
        label: 'Pro',
        features: [
          { title: 'Unlimited Projects' },
          { title: '50GB Storage' },
          { title: 'Priority Support' },
          { title: 'Advanced Analytics' }
        ]
      },
      {
        label: 'Enterprise',
        features: [
          { title: 'Unlimited Everything' },
          { title: 'Custom Storage' },
          { title: '24/7 Support' },
          { title: 'Custom Features' },
          { title: 'SLA Guarantee' }
        ]
      }
    ]
  }
};

export const WithCustomContent = {
  args: {
    animationEffects: 'zoom-in',
    introContent: `
      <div class="text-center">
        <h2>Special Offer</h2>
        <p>Limited time pricing for new customers</p>
      </div>
    `,
    cardContent: '<h3>Custom Price</h3><p>Contact us for details</p>',
    buttonContent: '<a href="#" class="button button--secondary">Contact Sales</a>',
    cards: [
      {
        label: 'Startup',
        features: [
          { title: 'Perfect for small teams' },
          { title: 'All basic features' },
          { title: 'Email support' }
        ]
      },
      {
        label: 'Business',
        features: [
          { title: 'Scale as you grow' },
          { title: 'Advanced features' },
          { title: 'Phone support' },
          { title: 'Training included' }
        ]
      }
    ]
  }
};

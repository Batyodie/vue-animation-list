import { mount, config } from '@vue/test-utils';
import VueAnimationList from '../vue-animation-list.vue';
// import testComponentVue from '../components/test-component.vue';
import {
  DEFAULT_ANIMATION,
  DEFAULT_ANIMATION_DURATION,
  DEFAULT_DELAY_COUNT,
  DEFAULT_ROOT_CSS_CLASS,
  DEFAULT_STATIC_STYLES,
  DEFAULT_TAG,
} from '../constants/';

//FIXME temporarily removed the warning. Need to figure out how to fix it.
config.global.config.warnHandler = (msg) => {
  const slotsRenderWarn =
    'Slot "default" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.';
  if (msg === slotsRenderWarn) return;
  console.warn(msg);
};

const getDefaultAnimationStyles = (elementIndex: number, delay: number) => {
  const { opacity, animationFillMode } = DEFAULT_STATIC_STYLES;
  const animationDelay = `animation-delay: ${elementIndex * delay}ms;`;
  const animationDuration = `animation-duration: ${DEFAULT_ANIMATION_DURATION}s;`;
  const staticStyles = `opacity: ${opacity}; animation-fill-mode: ${animationFillMode};`;

  return `${staticStyles} ${animationDelay} ${animationDuration}`;
};

describe('Specs to corrent base render component witch html slots', () => {
  it('Expect correct base rendered root container witch default props and empty slots', () => {
    const wrapper = mount(VueAnimationList);
    const resultHtml = `<div class="${DEFAULT_ROOT_CSS_CLASS}"></div>`;

    expect(wrapper.html()).toContain(resultHtml);
  });

  it('Expect to rendered content witch default props and base html slots', () => {
    const slotContent = `
        <div>test block-1</div>
        <div>test block-2</div>
        <div>test block-3</div>`;
    const slotsContentCount = 3;
    const wrapper = mount(VueAnimationList, {
      slots: {
        default: slotContent,
      },
    });

    const rootHtmlContainer = wrapper.find(`.${DEFAULT_ROOT_CSS_CLASS}`);

    expect(rootHtmlContainer.findAll(DEFAULT_TAG).length).toEqual(slotsContentCount);
  });

  it('Expect to correct rendered text in content witch default props and base html slots', () => {
    const slotContentText = 'test block text';
    const slotContent = `
        <div>${slotContentText}</div>
        <div>test block-2</div>
        <div>test block-3</div>`;
    const wrapper = mount(VueAnimationList, {
      slots: {
        default: slotContent,
      },
    });

    const rootHtmlContainer = wrapper.find(`.${DEFAULT_ROOT_CSS_CLASS}`);

    expect(rootHtmlContainer.find(DEFAULT_TAG).text()).toEqual(slotContentText);
  });

  it('Expect to correct rendered default css class in base html slots content witch default props', () => {
    const defaultCssClass = 'test-class';
    const slotContent = `
        <div class="${defaultCssClass}">test block-1</div>
        <div class="${defaultCssClass}">test block-2</div>
        <div class="${defaultCssClass}">test block-3</div>`;
    const slotsContentCount = 3;
    const wrapper = mount(VueAnimationList, {
      slots: {
        default: slotContent,
      },
    });

    expect(wrapper.findAll(`.${defaultCssClass}`).length).toEqual(
      slotsContentCount,
    );
  });

  it('Expect to correct rendered base animation attrs for base html slots content witch default props', () => {
    const slotContent = `
        <div>test block-1</div>
        <div>test block-2</div>
        <div>test block-3</div>`;
    const wrapper = mount(VueAnimationList, {
      slots: {
        default: slotContent,
      },
    });

    const rootHtmlContainer = wrapper.find(`.${DEFAULT_ROOT_CSS_CLASS}`);
    const renderSlotsContent = rootHtmlContainer.findAll(DEFAULT_TAG);

    renderSlotsContent.forEach((slotElement, elementIndex) => {
      expect(slotElement.attributes('style')).toBe(
        getDefaultAnimationStyles(elementIndex, DEFAULT_DELAY_COUNT),
      );
      expect(slotElement.classes()).toContain(DEFAULT_ANIMATION);
    });
  });
});

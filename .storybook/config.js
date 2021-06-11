import {addParameters, configure} from '@storybook/angular';
import {INITIAL_VIEWPORTS} from "@storybook/addon-viewport";

// automatically import all files ending in *.stories.ts
configure(require.context('../src', true, /\.stories\.ts$/), module);

addParameters({
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,

    },
  },
});

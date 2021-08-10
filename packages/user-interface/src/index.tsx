import * as React from 'react'
import {
  Button,
  StylesProvider
} from '@gemeente-denhaag/denhaag-component-library'

export const ExampleComponent = () => {
  return (
    <StylesProvider>
      <Button>Test</Button>
    </StylesProvider>
  )
}

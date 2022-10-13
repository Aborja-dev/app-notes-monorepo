import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {fireEvent, render} from '@testing-library/react'
import { Toggable } from './Toggable'
import { es } from '../i18n'


describe('Toggable test',()=>{
    const buttonLabel = 'show content'
    let component
    beforeEach(()=>{
        component = render(
            <Toggable buttonLabel={buttonLabel}>
                <div>div de pruebas</div>
            </Toggable>
        )
    })
    test('show and hide toogle content',()=>{
        const button = component.getByText(buttonLabel)
        const el = component.getByText('div de pruebas')
        fireEvent.click(button)
        expect(el.parentNode).not.toHaveStyle('display: none')
        const cancelButton = component.getByText(es.TOGGABLE.CANCEL_BUTTON)
        fireEvent.click(cancelButton)
        expect(el.parentNode).toHaveStyle('display: none')
        
    }) 
})



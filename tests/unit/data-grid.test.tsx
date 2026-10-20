// @vitest-environment jsdom
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { DataGrid, TOTAL_ROWS } from '@/components/data-grid';
import { en } from '@/i18n/dictionaries/en';

function renderGrid() {
  render(<DataGrid copy={en.lab} locale="en" />);
  return screen.getByRole('grid', { name: 'Products' });
}

describe('DataGrid', () => {
  it('exposes the full size of the virtualized grid', () => {
    const grid = renderGrid();
    expect(grid).toHaveAttribute('aria-rowcount', String(TOTAL_ROWS + 1));
    expect(grid).toHaveAttribute('aria-colcount', '6');
    expect(within(grid).getAllByRole('row').length).toBeLessThan(40);
    expect(screen.getByRole('status')).toHaveTextContent('Showing 10,000 of 10,000 products');
  });

  it('has a single tab stop and moves focus with the arrow keys', async () => {
    const grid = renderGrid();
    // Search, category, then the grid's single tab stop.
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    const productHeader = screen.getByRole('button', { name: 'Product' });
    expect(productHeader).toHaveFocus();

    await userEvent.keyboard('{ArrowDown}');
    const firstCell = within(grid).getAllByRole('gridcell')[0];
    expect(firstCell).toHaveFocus();
    expect(firstCell).toHaveAttribute('tabindex', '0');

    await userEvent.keyboard('{End}');
    expect(document.activeElement).toHaveAttribute('aria-colindex', '6');
    await userEvent.keyboard('{Home}');
    expect(document.activeElement).toHaveAttribute('aria-colindex', '1');
    await userEvent.keyboard('{Control>}{Home}{/Control}');
    expect(productHeader).toHaveFocus();
    expect(grid.querySelectorAll('[tabindex="0"]')).toHaveLength(1);
  });

  it('sorts from the header and reports it with aria-sort', async () => {
    renderGrid();
    const unitsHeader = screen.getByRole('columnheader', { name: /Units sold/ });
    expect(unitsHeader).not.toHaveAttribute('aria-sort');
    await userEvent.click(within(unitsHeader).getByRole('button'));
    expect(unitsHeader).toHaveAttribute('aria-sort', 'descending');
    await userEvent.click(within(unitsHeader).getByRole('button'));
    expect(unitsHeader).toHaveAttribute('aria-sort', 'ascending');
  });

  it('filters by category and announces the result count', () => {
    renderGrid();
    fireEvent.change(screen.getByRole('combobox', { name: 'Category' }), { target: { value: 'shoes' } });
    expect(screen.getByRole('status')).toHaveTextContent(/Showing [\d,]+ of 10,000 products/);
    expect(screen.getByRole('status')).not.toHaveTextContent('Showing 10,000');
    for (const cell of screen.getAllByRole('gridcell').filter((c) => c.getAttribute('aria-colindex') === '2')) {
      expect(cell).toHaveTextContent('Shoes');
    }
  });
});

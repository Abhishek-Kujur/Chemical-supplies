OVERVIEW:
_ This project renders a table from a JSON file.
_ It allows user to manipulate it(add, delete, sort, edit) and save changes to data.

FEATURES:
_ Sort the table in ascending/descending order by clicking on different headers.
_ Add a new row of data in the table.
_ Edit the data in each cell by double-clicking it.
_ Select one or more row using the checkboxes on the first column, it also includes select all row feature.
_ Selected row(s) can be deleted/ move up / mode down. Highlight the selected row(s).
_ JSON file with different data can also be rendered in table.

FUNCTIONALITY:

    *   Sorting Funtionality:
        -   The table can be sorted by clicking on the column header. When a header is clicked, the table is sorted by that cloumn in ascending order.
        -   If the same header is clicked again, the table is sorted in descending order.
        -   When a header is clicked, a key is received which essentially is the name of the header then a sort method is call on the data array with that key and get
            sorted.

    *   Add Button Functionality:
        -   When the add button is clicked, it displays a form with fields for each column in the table.
        -   Once the user has filled the form and clicks the submit button, thr form data gets added to the data array and the table is re-rendered to show the updated
            table.
        -   After re-rendering the table, form gets hide again.

    *   Selecting Row with Checkbox:
        -   When a checkbox is clicked it select or de-select the row according to its previous state.
        -   When a row(s) is/are selected it is added to a new array called rowsSelected and when it gets de-selected it gets remove from that array.
        -   Checkbox present in header is used for selecting all the rows.
        -   After selecting row(s), delete, move up, move down function can be performed on selected row(s).

    *   Move Up/Down Button Functionality:
        -   When move up button is clicked rowsSelected array is sorted(after sorting array gets reverse in case of move down button).
        -   Array is sorted because if third row is selected before second row then move up function will not change any thing, as third row will move up first and then
            second row which is the initial positions of the rows before moving up.
        -   It swaps with element above it(below it in case of move down) and re-renders the table again.
        -   When first row is selected it won't move up as there is no row to swap and if last row is selected it won't move down as there is no row to swap.
        -   Lastly is resets

    *   Delete Button Functionaltiy:
        -   Delete button deletes the entry of the selected row(s) from data array.
        -   After selecting the row(s), data array filter and return the element that are not present in rowSelected array and re-renders the table.
        -   Lastly it resets the rowSelected array.

    *   Edit Functionality:
        -   Edit functionality is present in every cell of the table body.
        -   To enable edit cell, user has to double-click the cell and edit the data inside it.
        -   Edited cell data are stored in a different array of object called updatedData.

    *   Refresh Button Functionality:
        -   After the data in cell is edited, if refresh button is clicked then undo the edits.
        -   It basically re-renders the table and resets the updatedData array.

    *   Save Button Functionaltiy:
        -   When save button is clicked it updates the original data array with the data in updatedData array.
        -   Once the save button is clicked refresh button won't work.

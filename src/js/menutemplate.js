"use strict";
/*------------------------------------------------------------------------------
 *  Copyright (c) 2019 Sagar Gurtu
 *  Licensed under the MIT License.
 *  See License in the project root for license information.
 *----------------------------------------------------------------------------*/

const { app, dialog } = require('electron');

exports.buildMenuTemplate = function (win) {
    return [
        {
            label: 'Arquivo',
            submenu: [
                {
                    label: 'Abrir arquivo...',
                    id: 'file-open',
                    accelerator: 'CmdOrCtrl+O',
                    click() {
                        dialog.showOpenDialog(win, {
                            properties: ['openFile'],
                            filters: [
                                { name: 'Arquivo PDF', extensions: ['pdf'] }
                            ]
                        }, (filename) => {
                            if (filename) {
                                win.webContents.send('file-open',
                                    filename.toString())
                            }
                        })
                    }
                },
                {
                    label: 'Imprimir...',
                    id: 'file-print',
                    accelerator: 'CmdOrCtrl+P',
                    enabled: false,
                    click() {
                        win.webContents.send('file-print')
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Propriedades...',
                    id: 'file-properties',
                    enabled: false,
                    click() {
                        win.webContents.send('file-properties')
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: 'Fechar',
                    id: 'file-close',
                    enabled: false,
                    click() {
                        win.webContents.send('file-close')
                    }
                },
                {
                    label: 'Sair',
                    click() {
                        app.quit()
                    }
                }
            ]
        },
        {
            label: 'Vizualizador',
            submenu: [
                {
                    label: 'Maximizar',
                    id: 'view-fullscreen',
                    enabled: false,
                    accelerator: 'F11',
                    click() {
                        win.webContents.send('view-fullscreen')
                    }
                }
            ]
        },
        {
            label: 'Ajuda',
            submenu: [
                {
                    label: 'Ajuda',
                    id: 'about'
                }
            ]
        }

    ];
};
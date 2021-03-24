/*
 * See the NOTICE file distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation; either version 2.1 of
 * the License, or (at your option) any later version.
 *
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this software; if not, write to the Free
 * Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301 USA, or see the FSF site: http://www.fsf.org.
 */
package org.xwiki.appwithinminutes.test.po;

import org.openqa.selenium.By;

/**
 * Represents the pane used to edit a 'Static List' class field.
 * 
 * @version $Id$
 * @since 4.2M1
 */
public class StaticListClassFieldEditPane extends ListClassFieldEditPane
{
    /**
     * Creates a new instance.
     * 
     * @param fieldName the name of the date field
     */
    public StaticListClassFieldEditPane(String fieldName)
    {
        super(fieldName);
    }

    /**
     * @return the static list items editor
     */
    public StaticListItemsEditor getItemsEditor()
    {
        return new StaticListItemsEditor(
            getDriver().findElementWithoutWaiting(getContainer(), By.className("staticListEditor")));
    }

    /**
     * @return {@code true} if the field is readonly, {@code false} otherwise
     * @since 13.2
     * @since 12.10.6
     */
    public boolean isReadOnly()
    {
        return getSizeInput().getAttribute("readOnly") != null;
    }
}

/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["f-table-schema should display rows and column based on data"] = 
`<div class="f-table-schema-wrapper">
  <slot name="search">
    <f-div
      align="top-left"
      direction="row"
      gap="none"
      height="fill-container"
      overflow="wrap"
      padding="medium none"
      selected="none"
      state="transparent"
      sticky="none"
      style="padding: 12px 0px; border-radius: 0px;"
      variant="block"
      width="fill-container"
    >
      <f-search
        category="fill"
        clear=""
        result=""
        scope="[&quot;all&quot;,&quot;firstName&quot;,&quot;lastName&quot;,&quot;age&quot;,&quot;birthDate&quot;,&quot;email&quot;,&quot;mobile&quot;,&quot;sex&quot;,&quot;address&quot;]"
        selected-scope="all"
        size="medium"
        state="default"
        variant="round"
      >
      </f-search>
    </f-div>
  </slot>
  <f-table
    selectable="none"
    size="medium"
    style="grid-template-columns: auto auto auto auto auto auto auto 300px;"
    variant="stripped"
  >
    <f-trow
      expand-icon-position="right"
      slot="header"
      state="default"
    >
      <f-tcell
        part="cell"
        sticky-left=""
      >
        <f-div
          align="top-left"
          direction="row"
          gap="small"
          height="100%"
          overflow="wrap"
          padding="none"
          selected="none"
          state="transparent"
          sticky="none"
          style="padding: 0px; width: fit-content; height: 100%; border-radius: 0px;"
          variant="block"
          width="fit-content"
        >
          <f-text
            align="left"
            size="medium"
            state="default"
            variant="para"
            weight="regular"
          >
            First name
          </f-text>
          <f-icon-button
            category="packed"
            size="medium"
            state="neutral"
          >
          </f-icon-button>
        </f-div>
      </f-tcell>
      <f-tcell part="cell">
        <f-div
          align="top-left"
          direction="row"
          gap="small"
          height="100%"
          overflow="wrap"
          padding="none"
          selected="none"
          state="transparent"
          sticky="none"
          style="padding: 0px; width: fit-content; height: 100%; border-radius: 0px;"
          variant="block"
          width="fit-content"
        >
          <f-text
            align="left"
            size="medium"
            state="default"
            variant="para"
            weight="regular"
          >
            Last name
          </f-text>
          <f-icon-button
            category="packed"
            size="medium"
            state="neutral"
          >
          </f-icon-button>
        </f-div>
      </f-tcell>
      <f-tcell part="cell">
        <f-div
          align="top-left"
          direction="row"
          gap="small"
          height="100%"
          overflow="wrap"
          padding="none"
          selected="none"
          state="transparent"
          sticky="none"
          style="padding: 0px; width: fit-content; height: 100%; border-radius: 0px;"
          variant="block"
          width="fit-content"
        >
          <f-text
            align="left"
            size="medium"
            state="default"
            variant="para"
            weight="regular"
          >
            Age
          </f-text>
          <f-icon-button
            category="packed"
            size="medium"
            state="neutral"
          >
          </f-icon-button>
        </f-div>
      </f-tcell>
      <f-tcell part="cell">
        <f-div
          align="top-left"
          direction="row"
          gap="small"
          height="100%"
          overflow="wrap"
          padding="none"
          selected="none"
          state="transparent"
          sticky="none"
          style="padding: 0px; width: fit-content; height: 100%; border-radius: 0px;"
          variant="block"
          width="fit-content"
        >
          <f-text
            align="left"
            size="medium"
            state="default"
            variant="para"
            weight="regular"
          >
            Birth Date
          </f-text>
          <f-icon-button
            category="packed"
            size="medium"
            state="neutral"
          >
          </f-icon-button>
        </f-div>
      </f-tcell>
      <f-tcell part="cell">
        <f-div
          align="top-left"
          direction="row"
          gap="small"
          height="100%"
          overflow="wrap"
          padding="none"
          selected="none"
          state="transparent"
          sticky="none"
          style="padding: 0px; width: fit-content; height: 100%; border-radius: 0px;"
          variant="block"
          width="fit-content"
        >
          <f-text
            align="left"
            size="medium"
            state="default"
            variant="para"
            weight="regular"
          >
            Email
          </f-text>
          <f-icon-button
            category="packed"
            size="medium"
            state="neutral"
          >
          </f-icon-button>
        </f-div>
      </f-tcell>
      <f-tcell part="cell">
        <f-div
          align="top-left"
          direction="row"
          gap="small"
          height="100%"
          overflow="wrap"
          padding="none"
          selected="none"
          state="transparent"
          sticky="none"
          style="padding: 0px; width: fit-content; height: 100%; border-radius: 0px;"
          variant="block"
          width="fit-content"
        >
          <f-text
            align="left"
            size="medium"
            state="default"
            variant="para"
            weight="regular"
          >
            Mobile
          </f-text>
          <f-icon-button
            category="packed"
            size="medium"
            state="neutral"
          >
          </f-icon-button>
        </f-div>
      </f-tcell>
      <f-tcell part="cell">
        <f-div
          align="top-left"
          direction="row"
          gap="small"
          height="100%"
          overflow="wrap"
          padding="none"
          selected="none"
          state="transparent"
          sticky="none"
          style="padding: 0px; width: fit-content; height: 100%; border-radius: 0px;"
          variant="block"
          width="fit-content"
        >
          <f-text
            align="left"
            size="medium"
            state="default"
            variant="para"
            weight="regular"
          >
            Sex
          </f-text>
          <f-icon-button
            category="packed"
            size="medium"
            state="neutral"
          >
          </f-icon-button>
        </f-div>
      </f-tcell>
      <f-tcell
        part="cell"
        selected=""
        sticky-left=""
        style="min-width: 300px; display: block;"
        width="300px"
      >
        <f-div
          align="top-left"
          direction="row"
          gap="small"
          height="100%"
          overflow="wrap"
          padding="none"
          selected="none"
          state="transparent"
          sticky="none"
          style="padding: 0px; width: fit-content; height: 100%; border-radius: 0px;"
          variant="block"
          width="fit-content"
        >
          <f-text
            align="left"
            size="medium"
            state="default"
            variant="para"
            weight="regular"
          >
            Address
          </f-text>
          <f-icon-button
            category="packed"
            size="medium"
            state="neutral"
          >
          </f-icon-button>
        </f-div>
      </f-tcell>
    </f-trow>
    <f-trow
      expand-icon-position="right"
      id="1"
      selected=""
      state="default"
    >
      <f-div
        align="top-left"
        direction="row"
        gap="none"
        height="fill-container"
        overflow="wrap"
        padding="none"
        selected="none"
        slot="details"
        state="transparent"
        sticky="none"
        style="padding: 0px; width: 100%; border-radius: 0px;"
        variant="block"
        width="100%"
      >
        <f-div
          align="top-left"
          direction="row"
          gap="none"
          height="fill-container"
          overflow="wrap"
          padding="large"
          selected="none"
          state="transparent"
          sticky="none"
          style="padding: 16px; border-radius: 0px;"
          variant="block"
          width="fill-container"
        >
          <f-text
            align="left"
            size="medium"
            state="danger"
            variant="para"
            weight="regular"
          >
            This is Details slot
          </f-text>
        </f-div>
      </f-div>
      <f-tcell
        part="cell"
        sticky-left=""
      >
        <f-text
          align="left"
          size="medium"
          state="default"
          style="height:100%"
          variant="para"
          weight="regular"
        >
          Vikas 0
        </f-text>
      </f-tcell>
      <f-tcell part="cell">
        <f-text
          align="left"
          size="medium"
          state="default"
          style="height:100%"
          variant="para"
          weight="regular"
        >
          Last name 0
        </f-text>
      </f-tcell>
      <f-tcell part="cell">
        <f-text
          align="left"
          size="medium"
          state="default"
          style="height:100%"
          variant="para"
          weight="regular"
        >
          33
        </f-text>
      </f-tcell>
      <f-tcell part="cell">
        <f-div
          align="top-left"
          direction="row"
          gap="small"
          height="fill-container"
          overflow="wrap"
          padding="none"
          selected="none"
          state="transparent"
          sticky="none"
          style="padding: 0px; border-radius: 0px;"
          variant="block"
          width="hug-content"
        >
          <f-icon source="i-date-time">
          </f-icon>
          <f-text
            align="left"
            inline=""
            size="medium"
            state="default"
            variant="para"
            weight="regular"
          >
            17-11-1995
          </f-text>
        </f-div>
      </f-tcell>
      <f-tcell part="cell">
        <f-div
          align="top-left"
          direction="row"
          gap="x-small"
          height="fill-container"
          overflow="wrap"
          padding="none"
          selected="none"
          state="transparent"
          sticky="none"
          style="padding: 0px; border-radius: 0px;"
          variant="block"
          width="fill-container"
        >
          <f-icon
            source="i-hashtag"
            state="warning"
          >
          </f-icon>
          <f-text
            align="left"
            inline=""
            size="medium"
            state="warning"
            variant="para"
            weight="regular"
          >
            vikas0@cldcvr.com
          </f-text>
        </f-div>
      </f-tcell>
      <f-tcell part="cell">
        <f-text
          align="left"
          size="medium"
          state="default"
          style="height:100%"
          variant="para"
          weight="regular"
        >
          8989899981
        </f-text>
      </f-tcell>
      <f-tcell part="cell">
        <f-text
          align="left"
          size="medium"
          state="default"
          style="height:100%"
          variant="para"
          weight="regular"
        >
          male
        </f-text>
      </f-tcell>
      <f-tcell
        part="cell"
        selected=""
        sticky-left=""
        style="min-width: 300px; display: block;"
        width="300px"
      >
        <f-text
          align="left"
          size="medium"
          state="default"
          style="height:100%"
          variant="para"
          weight="regular"
        >
          Wagholi Pune 412207
        </f-text>
      </f-tcell>
    </f-trow>
    <f-trow
      expand-icon-position="right"
      id="1"
      selected=""
      state="default"
    >
      <f-div
        align="top-left"
        direction="row"
        gap="none"
        height="fill-container"
        overflow="wrap"
        padding="none"
        selected="none"
        slot="details"
        state="transparent"
        sticky="none"
        style="padding: 0px; width: 100%; border-radius: 0px;"
        variant="block"
        width="100%"
      >
        <f-div
          align="top-left"
          direction="row"
          gap="none"
          height="fill-container"
          overflow="wrap"
          padding="large"
          selected="none"
          state="transparent"
          sticky="none"
          style="padding: 16px; border-radius: 0px;"
          variant="block"
          width="fill-container"
        >
          <f-text
            align="left"
            size="medium"
            state="danger"
            variant="para"
            weight="regular"
          >
            This is Details slot
          </f-text>
        </f-div>
      </f-div>
      <f-tcell
        part="cell"
        sticky-left=""
      >
        <f-text
          align="left"
          size="medium"
          state="default"
          style="height:100%"
          variant="para"
          weight="regular"
        >
          Vikas 1
        </f-text>
      </f-tcell>
      <f-tcell part="cell">
        <f-text
          align="left"
          size="medium"
          state="default"
          style="height:100%"
          variant="para"
          weight="regular"
        >
          Last name 1
        </f-text>
      </f-tcell>
      <f-tcell part="cell">
        <f-text
          align="left"
          size="medium"
          state="default"
          style="height:100%"
          variant="para"
          weight="regular"
        >
          33
        </f-text>
      </f-tcell>
      <f-tcell part="cell">
        <f-div
          align="top-left"
          direction="row"
          gap="small"
          height="fill-container"
          overflow="wrap"
          padding="none"
          selected="none"
          state="transparent"
          sticky="none"
          style="padding: 0px; border-radius: 0px;"
          variant="block"
          width="hug-content"
        >
          <f-icon source="i-date-time">
          </f-icon>
          <f-text
            align="left"
            inline=""
            size="medium"
            state="default"
            variant="para"
            weight="regular"
          >
            17-11-1995
          </f-text>
        </f-div>
      </f-tcell>
      <f-tcell part="cell">
        <f-div
          align="top-left"
          direction="row"
          gap="x-small"
          height="fill-container"
          overflow="wrap"
          padding="none"
          selected="none"
          state="transparent"
          sticky="none"
          style="padding: 0px; border-radius: 0px;"
          variant="block"
          width="fill-container"
        >
          <f-icon
            source="i-hashtag"
            state="warning"
          >
          </f-icon>
          <f-text
            align="left"
            inline=""
            size="medium"
            state="warning"
            variant="para"
            weight="regular"
          >
            vikas1@cldcvr.com
          </f-text>
        </f-div>
      </f-tcell>
      <f-tcell part="cell">
        <f-text
          align="left"
          size="medium"
          state="default"
          style="height:100%"
          variant="para"
          weight="regular"
        >
          8989899981
        </f-text>
      </f-tcell>
      <f-tcell part="cell">
        <f-text
          align="left"
          size="medium"
          state="default"
          style="height:100%"
          variant="para"
          weight="regular"
        >
          male
        </f-text>
      </f-tcell>
      <f-tcell
        part="cell"
        selected=""
        sticky-left=""
        style="min-width: 300px; display: block;"
        width="300px"
      >
        <f-text
          align="left"
          size="medium"
          state="default"
          style="height:100%"
          variant="para"
          weight="regular"
        >
          Wagholi Pune 412207
        </f-text>
      </f-tcell>
    </f-trow>
  </f-table>
  <f-div
    align="middle-left"
    class="load-more"
    direction="row"
    gap="none"
    height="fill-container"
    overflow="wrap"
    padding="medium none"
    selected="none"
    state="transparent"
    sticky="none"
    style="display: none; padding: 12px 0px; border-radius: 0px;"
    variant="block"
    width="fill-container"
  >
    <f-button
      category="outline"
      label="load more"
      size="medium"
      state="primary"
      variant="round"
    >
    </f-button>
  </f-div>
</div>
`;
/* end snapshot f-table-schema should display rows and column based on data */


<script>
  // TODO Ивенты окончания анимации
  import { gsap } from "gsap";

  export default {
    functional: true,
    render(createElement, context) {
      // console.log("TCollapse :: render", { context });
      /* Входные параметры: проверка и преобразование */
      /* Длительность перехода. По-умолчанию, 0.5 */
      const defaultDuration = 0.5;
      const duration = Math.max(parseFloat(context.props.duration), 0) || defaultDuration;
      /* Горизонтальный коллапс */
      const isHorizontal =
        "horizontal" in context.props && // Может быть все, что угодно,
        context.props.horizontal !== false; // кроме явного запрета
      /* Вертикальный коллапс. По-умолчанию, если ничего не указано */
      const isVertical =
        ("vertical" in context.props || !isHorizontal) &&
        context.props.vertical !== false; // аналогично isHorizontal

      const sizes = {};
      if (isHorizontal) {
        sizes.width = 0;
        sizes.paddingLeft = 0;
        sizes.paddingRight = 0;
        sizes.marginLeft = 0;
        sizes.marginRight = 0;
      }
      if (isVertical) {
        sizes.height = 0;
        sizes.paddingTop = 0;
        sizes.paddingBottom = 0;
        sizes.marginTop = 0;
        sizes.marginBottom = 0;
      }

      /* Выбор компонента контейнера */
      const isGroup = context.children.length > 1;
      let element = "transition";
      if(isGroup){
        element = "transition-group";
      }

      const data = {
        props: {
          name: "t-collapse",
          tag: context.props.tag
        },
        staticClass: context.data.staticClass,
        class: context.data.class,
        nativeOn: context.listeners,
        on: {
          /**
           * Анимация перехода при разворачивании
           * @param {HTMLElement} el DOM элемент тела спойлера
           * @param {Function} done Коллбэк окончания анимации
           */
          enter(el, done) {
            el.style.overflow = "hidden";
            gsap.from(el, {
              ...sizes,
              duration,
              onComplete: () => {
                if (isHorizontal) {
                  el.style.width = "";
                  el.style.paddingLeft = "";
                  el.style.paddingRight = "";
                  el.style.marginLeft = "";
                  el.style.marginRight = "";
                };
                if (isVertical) {
                  el.style.height = "";
                  el.style.paddingTop = "";
                  el.style.paddingBottom = "";
                  el.style.marginTop = "";
                  el.style.marginBottom = "";
                };
                el.style.overflow = "";
                done();
              }
            });
          },
          /**
           * Анимация перехода при сворачивании
           * @param {HTMLElement} el DOM элемент тела спойлера
           * @param {Function} done Коллбэк окончания анимации
           */
          leave(el, done) {
            el.style.overflow = "hidden";
            gsap.to(el, {
              ...sizes,
              duration,
              onComplete: done
            });
          }
        }
      };

      return createElement(element, data, context.children);
    }
  };
</script>

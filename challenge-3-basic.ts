interface EventName<T> {
  eventName: keyof T;
}

interface EventData<T> {
  data: T[keyof T];
}

interface MyEvent<T> extends EventName<T> {
  data: EventData<T>["data"];
}

interface MyFilter<T> extends EventName<T> {
  filters: (data: T[keyof T]) => boolean;
}

interface MyMap<T> extends EventName<T> {
  maps: (data: T[keyof T]) => T[keyof T];
}

class EventProcessor<T> {
  protected events: MyEvent<T>[] = [];
  protected filters = [];
  protected maps = [];

  handleEvent<Name extends keyof T>(
    eventName: Name,
    data: EventData<T>["data"]
  ): void {
    this.events.push({
      eventName,
      data,
    });
  }

  addFilter<Name extends EventName<T>["eventName"]>(
    eventName: Name,
    filter: (data: T[keyof T]) => boolean
  ): void {
    this.addFilter(eventName, filter);
  }

  addMap(eventName: keyof T, map: (data: T[keyof T]) => T[keyof T]): void {
    this.addMap(eventName, map);
  }

  getProcessedEvents() {
    return this.events.reduce((acc, { eventName, data }, index) => {
      if (this.filters[index]) {
        const validEvent = this.events.filter(this.filters[index]);
        return validEvent;
      }
      return acc;
    }, []);
  }
}

interface EventMap {
  login: { user?: string | null; name?: string; hasSession?: boolean };
  logout: { user?: string };
}

class UserEventProcessor extends EventProcessor<EventMap> {}

const uep = new UserEventProcessor();

uep.addFilter("login", ({ user }) => Boolean(user));

uep.addMap("login", (data: EventMap["login"]) => ({
  ...data,
  hasSession: Boolean(data.user && data.name),
}));

uep.handleEvent("login", {
  user: null,
  name: "jack",
});
uep.handleEvent("login", {
  user: "tom",
  name: "tomas",
});
uep.handleEvent("logout", {
  user: "tom",
});

console.log(uep.getProcessedEvents());

/*
Result:
[
  {
    eventName: 'login',
    data: { user: 'tom', name: 'tomas', hasSession: true }
  },
  { eventName: 'logout', data: { user: 'tom' } }
]
*/
